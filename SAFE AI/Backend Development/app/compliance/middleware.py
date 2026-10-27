# audit trail middleware

from flask import request, current_app
from flask_jwt_extended import get_jwt_identity

def log_phi_access(response):
    """
    Executes after every API request to log access to Protected Health Information (PHI).
    """
    # Skip logging options requests from React CORS preflight
    if request.method == "OPTIONS":
        return response
        
    user_id = get_jwt_identity() or "Anonymous"
    endpoint = request.endpoint
    ip_address = request.remote_addr
    status_code = response.status_code
    
    # Format a structured JSON log string
    log_payload = f"USER: {user_id} | IP: {ip_address} | ACTION: {request.method} {endpoint} | STATUS: {status_code}"
    
    # In production, stream this instantly to a secure logger (e.g., AWS CloudWatch / Syslog)
    current_app.logger.info(log_payload)
    
    return response
