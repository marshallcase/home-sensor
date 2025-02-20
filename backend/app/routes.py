from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from . import models, schemas
from .database import get_db

router = APIRouter()

@router.get("/sensors/{sensor_id}/data")
def get_sensor_data(
    sensor_id: str,
    start_time: datetime = None,
    end_time: datetime = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.SensorData).filter(
        models.SensorData.sensor_id == sensor_id
    )
    
    if start_time:
        query = query.filter(models.SensorData.timestamp >= start_time)
    if end_time:
        query = query.filter(models.SensorData.timestamp <= end_time)
    
    results = query.order_by(models.SensorData.timestamp.asc()).all()
    print(f"Returning {len(results)} sensor readings")  # Debug print
    return [{"timestamp": r.timestamp, "value": r.value, "unit": r.unit} for r in results]

@router.post("/sensors/{sensor_id}/data")
def add_sensor_data(
    sensor_id: str, 
    data: schemas.SensorDataInput, 
    db: Session = Depends(get_db)
):
    sensor_data = models.SensorData(
        sensor_id=sensor_id,
        timestamp=datetime.utcnow(),
        value=data.value,
        unit=data.unit
    )
    db.add(sensor_data)
    db.commit()
    db.refresh(sensor_data)
    return sensor_data