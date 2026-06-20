const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres:postgres@localhost:5432/vo_script_generator'
});
async function update() {
  await client.connect();
  const res = await client.query('UPDATE "user" SET email_verified = true;');
  console.log(`Successfully verified ${res.rowCount} existing users (including Admin)!`);
  await client.end();
}
update().catch(console.error);
