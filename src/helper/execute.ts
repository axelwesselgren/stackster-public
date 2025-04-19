import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let sqlClient: NeonQueryFunction<false, false> | null = null;

const getSqlClient = (): NeonQueryFunction<false, false> => {
  if (!sqlClient) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL environment variable is not configured');
    }
    sqlClient = neon(dbUrl);
  }
  return sqlClient;
};

const executeQuery = async <T>(queryFn: (sql: NeonQueryFunction<false, false>) => Promise<T>): Promise<T> => {
  try {
    const sql = getSqlClient();
    return await queryFn(sql);
  } catch (error) {
    console.error('Database query failed:', error);
    throw new Error(`Database operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export { executeQuery };