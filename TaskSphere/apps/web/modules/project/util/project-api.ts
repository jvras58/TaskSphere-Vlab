export async function createProject(data: any, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Erro ao criar projeto');
  }

  return res.json();
}
export async function getProjects(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Erro ao buscar projetos');
    }
    return res.json();
}
export async function getProjectById(id: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Erro ao buscar projeto');
  }

  return res.json();
}

export async function updateProject(id: string, data: any, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Erro ao atualizar projeto');
  }
    return res.json();
}
export async function deleteProject(id: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Erro ao deletar projeto');
  }

  return res.json();
}

