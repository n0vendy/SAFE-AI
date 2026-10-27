# secure endpoint (example)

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from app.auth.decorators import requires_role
from app.data_collection.schemas import WorkplaceDataSchema
from app.data_collection.models import WorkplaceData

data_bp = Blueprint('data', __name__)
data_schema = WorkplaceDataSchema()

@data_bp.route('/submit-report', methods=['POST'])
@jwt_required()
@requires_role('Data Submitter')
def submit_report():
    # 1. Parse and validate JSON input from React
    json_data = request.get_json()
    errors = data_schema.validate(json_data)
    if errors:
        return jsonify({"errors": errors}), 400
        
    # 2. Enforce Multi-Tenancy data isolation
    claims = get_jwt()
    user_facility = claims.get('facility_id')
    
    if json_data['facility_id'] != user_facility:
        return jsonify({"error": "Cross-facility data submission blocked."}), 403
        
    # 3. Save to database (Logic handled here)
    # ...
    
    return jsonify({"status": "Data strictly recorded"}), 201
