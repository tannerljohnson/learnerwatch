import boto3
import json
import os
import sys
from dateutil.parser import parse
from lambda_decorators import cors_headers

print('loading function...')

s3 = boto3.client('s3', region_name='us-east-1')

@cors_headers
def lambda_handler(event, context):

    bucketName = os.environ['BUCKET_NAME']
    prefix = os.environ['PREFIX']
    records = []

    paginator = s3.get_paginator('list_objects_v2')
    operation_parameters = {
        'Bucket': bucketName,
        # 'Prefix': prefix
    }
    result = paginator.paginate(**operation_parameters)

    for page in result:
        # print("sensor: " + page['sensor'])
        print(page)

        if 'Contents' in page:
            for key in page['Contents']:
                bucketKey = key['Key']

                try:
                    queryResponse = s3.select_object_content(
                        Bucket=bucketName,
                        Key=bucketKey,
                        ExpressionType='SQL',
                        Expression="select s.\"sensor\", s.\"sendTime\" from s3object s",
                        InputSerialization={'JSON': {"Type": "Lines"}},
                        OutputSerialization={'JSON': {}}
                    )
                except:
                    print('ERROR - Exception performing S3 Select on Key: ' + bucketKey + '. Message: ' + sys.exc_info()[0])

                for responses in queryResponse['Payload']:

                    if 'Records' in responses:
                        try:
                            getJson = json.loads(responses['Records']['Payload'])
                            # parsedSensor = parse(getJson(['sensor']))
                            # print("parsedSensor: " + parsedSensor)
                            # parsedTime = parse(getJson['sendTime'])
                            # getJson['sendTime'] = str(parsedTime.month) + '/' + str(parsedTime.day) + '/' + str(parsedTime.year)
                            records.append(getJson)
                        except:
                            print('ERROR - Exception performing JSON to Python Object on Key: ' + bucketKey + '. Message: ' + sys.exc_info()[0])

        else:
            print('ERROR - Bucket: ' + bucketName + ' did not contain any keys!')

    body = {
            'records' : records,
            'name' : 'Tanner'
            }

    response = {
        'statusCode': 200,
        # 'headers' : {
        #     'Access-Control-Allow-Origin': '*',
        #     'Access-Control-Allow-Credentials': True,
        # },
        'body' : body
    }
    return response
