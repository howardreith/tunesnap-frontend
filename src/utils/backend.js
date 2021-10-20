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
  throw Error(`Song ${song} could not be created.`);
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
