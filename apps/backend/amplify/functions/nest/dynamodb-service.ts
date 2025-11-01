// amplify/functions/nest/dynamodb-service.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
});

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "bigdays-data";

export interface DynamoDBItem {
  id: string;
  type: string;
  [key: string]: any;
}

export class DynamoDBService {
  /**
   * Create or update an item in DynamoDB
   */
  static async putItem(item: DynamoDBItem): Promise<void> {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    });
    await docClient.send(command);
  }

  /**
   * Get an item by id and type
   */
  static async getItem(id: string, type: string): Promise<DynamoDBItem | null> {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        id,
        type,
      },
    });
    const response = await docClient.send(command);
    return response.Item as DynamoDBItem | null;
  }

  /**
   * Update an item
   */
  static async updateItem(
    id: string,
    type: string,
    updates: Record<string, any>
  ): Promise<void> {
    // Build update expression
    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    Object.entries(updates).forEach(([key, value], index) => {
      const nameKey = `#key${index}`;
      const valueKey = `:val${index}`;
      updateExpressions.push(`${nameKey} = ${valueKey}`);
      expressionAttributeNames[nameKey] = key;
      expressionAttributeValues[valueKey] = value;
    });

    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        id,
        type,
      },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    });
    await docClient.send(command);
  }

  /**
   * Delete an item
   */
  static async deleteItem(id: string, type: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        id,
        type,
      },
    });
    await docClient.send(command);
  }

  /**
   * Query items by partition key (id) and optionally filter by type
   */
  static async queryItems(
    id: string,
    typePrefix?: string
  ): Promise<DynamoDBItem[]> {
    const command = new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
        ...(typePrefix && { ":typePrefix": typePrefix }),
      },
      ...(typePrefix && {
        FilterExpression: "begins_with(#type, :typePrefix)",
        ExpressionAttributeNames: {
          "#type": "type",
        },
      }),
    });
    const response = await docClient.send(command);
    return (response.Items || []) as DynamoDBItem[];
  }

  /**
   * Scan all items (use with caution in production)
   */
  static async scanItems(
    limit?: number
  ): Promise<DynamoDBItem[]> {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
      ...(limit && { Limit: limit }),
    });
    const response = await docClient.send(command);
    return (response.Items || []) as DynamoDBItem[];
  }
}

