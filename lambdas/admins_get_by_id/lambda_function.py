import json
import sys
import os
import logging
import psycopg2
from psycopg2.extras import RealDictCursor

logging.warning('Testing connection - Admins get all')

try:
    rds_host = os.environ['RMDX_RDS_HOST']
    rds_port = os.environ['RMDX_RDS_PORT']
    db_name = os.environ['RMDX_DB_NAME']
    user_name = os.environ['RMDX_USER_NAME']
    password = os.environ['RMDX_PASSWORD']
    
    conn = psycopg2.connect(host=rds_host, port=rds_port, dbname=db_name, user=user_name, password=password)
    logging.info("SUCCESS: Connection to RDS Postgres instance succeeded")
    
except psycopg2.Error as e:
    logging.error("ERROR: Unexpected error: Could not connect to Postgres instance.")    
    logging.error(e)
    sys.exit()

def lambda_handler(event, context):

    logging.info('Testing connection - Admins get all 1')
    logging.warning('Testing connection - Admins get all 2')
    print('Testing connection - Admins get all 2')

    # Parse the request body
    try:
        request_body = json.loads(event['body'])
        # Assuming the request body contains an 'id' field
        requested_id = request_body.get('id')

        cur = conn.cursor(cursor_factory= RealDictCursor)
        cur.execute("SELECT * FROM admins")
        results = cur.fetchall()
        json_result = json.dumps(results)
        print(json_result)

    except Exception as e:
        # Return a 400 Bad Request response if unable to parse request body
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid request body'})
        }
    
    # If 'id' is present and equals 1, return "John"
    if requested_id == 1:
        response_body = {'name': 'John'}
        status_code = 200
    else:
        # Return a 404 Not Found response if 'id' is not 1
        response_body = {'message': 'User not found'}
        status_code = 404
    
    # Return the response
    return {
        'statusCode': status_code,
        'body': json.dumps(response_body)
    }
