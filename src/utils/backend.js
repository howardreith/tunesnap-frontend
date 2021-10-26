const backendUrl = 'http://localhost:8080';

export async function createSong(song) {
  const result = await fetch(`${backendUrl}/songs/create`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(song),
  });
  if (result.ok) {
    return result.json();
  }
  throw Error(`Song ${JSON.stringify(song)} could not be created.`);
}

export async function addAccompaniment(accompanimentData) {
  const result = await fetch(`${backendUrl}/accompaniment/create`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(accompanimentData),
  });
  if (result.ok) {
    return result.json();
  }
  throw Error(`Accompaniment ${JSON.stringify(accompanimentData)} could not be created.`);
}

export async function getSongs() {
  const result = await fetch(`${backendUrl}/songs`, {
    method: 'get',
  });
  if (result.ok) {
    return result.json();
  }
  throw Error('getSongs was unsuccessful');
}

export async function seedDb() {
  const result = await fetch(`${backendUrl}/admin/seedDb`, {
    method: 'get',
  });
  if (result.ok) {
    return result.json();
  }
  throw Error('seedDb was unsuccessful');
}

export async function getSongAtId(id) {
  const result = await fetch(`${backendUrl}/songs/${id}`, {
    method: 'get',
  });
  if (result.ok) {
    return result.json();
  }
  throw Error(`getSongAtId ${id} was unsuccessful`);
}
