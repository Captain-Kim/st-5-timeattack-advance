import { useState } from "react";
import { todoApi } from "../api/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function TodoForm({ fetchData }) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");


  // TODO: useMutation 으로 리팩터링 하세요.
  // const handleAddTodo = async (e) => {
  //   e.preventDefault();
  //   setTitle("");
  //   setContents("");
  //   await todoApi.post("/todos", {
  //     id: Date.now().toString(),
  //     title,
  //     contents,
  //     isCompleted: false,
  //     createdAt: Date.now(),
  //   });
  //   await fetchData();
  // };

  // const queryClient = new useQueryClient();

  const addTodo = async (newTodo) => {
    await todoApi.post('/todos', newTodo)
  }

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      alert('등록 성공');
      queryClient.invalidateQueries(['todos']);
    }
  });

  const handleAddTodo = (e) => {
    e.preventDefault();
    mutation.mutate({
      title,
      contents
    })
    setTitle('');
    setContents('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
