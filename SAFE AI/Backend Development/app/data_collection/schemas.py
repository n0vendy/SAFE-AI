# input sanitization/data validation

from marshmallow import Schema, fields, validate

class WorkplaceDataSchema(Schema):
    facility_id = fields.UUID(required=True)
    staff_count = fields.Int(required=True, validate=validate.Range(min=0))
    incident_report = fields.Str(required=True, validate=validate.Length(max=5000))
    reporting_period = fields.Date(required=True)
