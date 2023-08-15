import { MongoClient , Database } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

let db: Database ;

 export async function connect(){
  const client = new MongoClient();
//   // Connecting to a Local Database
// await client.connect("mongodb://127.0.0.1:27017");

// Connecting to a Mongo Atlas Database
// await client.connect({
//   db: "Cluster0",
//   tls: true,
//   servers: [
//     {
//       host: "localhost",
//       port: 27017,
//     },
//   ],
//   credential: {
//     username: "animesh239",
//     password: "utOglfqSwPU8t3XW",
//     db: "todo-app",
//     mechanism: "SCRAM-SHA-1",
//   },
// });
//   // Connect using srv url
  await client.connect(
    "mongodb+srv://animeshbarik239:utOglfqSwPU8t3XW@cluster0.onj1ouy.mongodb.net/",
  );
  const db= client.database("todo-app")
}

export function getDb(){
  return db ;
}


// // Connecting to a Local Database
// await client.connect("mongodb://127.0.0.1:27017");

// Connecting to a Mongo Atlas Database
// await client.connect({
//   db: "Cluster0",
//   tls: true,
//   servers: [
//     {
//       host: "cluster0.onj1ouy",
//       port: 27017,
//     },
//   ],
//   credential: {
//     username: "animesh239",
//     password: "utOglfqSwPU8t3XW",
//     db: "todo-app",
//     mechanism: "SCRAM-SHA-1",
//   },
// });
