const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function handleErrorResponse(res: Response) {
  return res.json().then(error => {
    throw new Error(error.message || 'Erro inesperado');
  });
}

export async function getTasksByProject(projectId: string, token: string): Promise<any[]> {
  const res = await fetch(`${BASE_URL}/api/tasks/projects/${projectId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log('Resposta bruta de tasks:', data);
  return data;
}

export async function createTask(projectId: string, data: any, token: string) {
  const res = await fetch(`${BASE_URL}/api/tasks/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) return handleErrorResponse(res);
  return res.json();
}

export async function updateTask(taskId: string, data: any, token: string) {
  const res = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) return handleErrorResponse(res);
  return res.json();
}

export async function deleteTask(taskId: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return handleErrorResponse(res);
  return true;
}

export async function assignTask(taskId: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/tasks/${taskId}/assign`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('Assign task response:', res);
  if (!res.ok) return handleErrorResponse(res);
  return res.json();
}
