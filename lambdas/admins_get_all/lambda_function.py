import json
import os
import logging
import psycopg2
from psycopg2.extras import RealDictCursor

def lambda_handler(event, context):
    
    try:        
        logging.info('Testing connection: Admins get all')

        rds_host = os.environ['RMDX_RDS_HOST']
        rds_port = os.environ['RMDX_RDS_PORT']
        db_name = os.environ['RMDX_DB_NAME']
        user_name = os.environ['RMDX_USER_NAME']
        password = os.environ['RMDX_PASSWORD']
            
        conn = psycopg2.connect(host=rds_host, port=rds_port, dbname=db_name, user=user_name, password=password)
        logging.info("Testing connection: Succeeded")

    except Exception as e:
        logging.error("Testing connection: Unexpected error: Could not connect to Postgres instance:")    
        logging.error(e)
        response = {
            'statusCode': 500,
            'body': json.dumps({'message': 'Testing connection: Unexpected error: Could not connect to Postgres instance'})
        }        
        return response

    try:
        logging.info('Executing query: Start')

        items = []
        item_count = 0

        with conn.cursor() as cur:
            cur.execute("SELECT * FROM admins")
            logging.info("Executing query: The following items have been found in the db:")
            for row in cur.fetchall():
                item_count += 1
                logging.info(row)
                items.append(row)
        conn.commit()

        logging.info("Executing query: Found %d items to RDS Postgres table" % item_count)

        response = {
            'statusCode': 200,
            'body': json.dumps({'items': items})
        }

    except Exception as e:
        logging.error("Executing query: Error occurred while retrieving items from the database:")
        logging.error(e)
        response = {
        'statusCode': 500,
        'body': json.dumps({'message': 'Internal Server Error ;) '})
        }

    return response
