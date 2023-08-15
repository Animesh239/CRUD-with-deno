import { Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { getDb } from "../helpers/db_client.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

const router = new Router();


interface Todo {
  id?: string;
  text: string;
}

let todos: Todo[] = [];

router.get('/todos', async (ctx) => {
  const todos = await getDb().collection('todos').find()  // { _id : ObjectId , text : '...'}
  const transformedTodos = todos.map((todo)=>{
    return {
    id : todo._id.$oid ,
    text : todo.text
    }
  })
  ctx.response.body = { todos: transformedTodos };
});

router.post('/todos', async (ctx) => {
  const data = await ctx.request.body().value;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.text,
  };
  const id = await getDb().collection('todos').insertOne(newTodo)

  newTodo.id = id.$oid ;

  // todos.push(newTodo);

  ctx.response.body = { message: 'Created todo!', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId;
  const data = await ctx.request.body().value;
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === tid;
  });
  todos[todoIndex] = { id: todos[todoIndex].id, text: data.text };
  ctx.response.body = { message: 'Updated todo' };
});

router.delete('/todos/:todoId', (ctx) => {
  const tid = ctx.params.todoId;
  todos = todos.filter((todo) => todo.id !== tid);
  ctx.response.body = { message: 'Deleted todo' };
});

export default router;
