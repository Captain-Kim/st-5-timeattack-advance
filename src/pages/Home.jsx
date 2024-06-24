import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { todoApi } from "../api/todos";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  // TODO: useQuery 로 리팩터링 하세요.
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await todoApi.get("/todos");
  //     setData(response.data);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();

  // }, []);

  const fetchTodos = async () => {
    const response = await todoApi.get('/todos');
    return response.data;
  }

  const { data: todos, isPending, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  });

  if (isPending) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (isError) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <>
      <h2>서버통신 투두리스트 by useState</h2>
      <TodoForm  />
      <TodoList todos={todos} />
    </>
  );
}
