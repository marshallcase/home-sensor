from pydantic import BaseModel
from datetime import datetime

class SensorDataInput(BaseModel):
    value: float
    unit: str

class SensorDataResponse(BaseModel):
    id: int
    sensor_id: str
    timestamp: datetime
    value: float
    unit: str

    class Config:
        from_attributes = True