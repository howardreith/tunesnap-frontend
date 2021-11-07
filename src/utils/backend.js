const backendUrl = 'http://localhost:8080';

export async function login(email, password) {
  const result = await fetch(`${backendUrl}/user/login`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (result.ok) {
    return result.json();
  }
  throw Error(`Could not log in user with email ${email}.`);
}

export async function register(email, password, displayName) {
  const result = await fetch(`${backendUrl}/user/register`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, displayName }),
  });
  if (result.ok) {
    return result.json();
  }
  throw Error(`Could not register user with email ${email}.`);
}

export async function updatePassword(newPassword, token) {
  const result = await fetch(`${backendUrl}/user/updatePassword`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newPassword }),
  });
  if (result.ok) {
    return result.json();
  }
  throw Error('Could not update password');
}

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

export async function addAccompaniment(accompanimentData, token) {
  const result = await fetch(`${backendUrl}/accompaniment/create`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: accompanimentData,
  });
  if (result.ok) {
    return result.json();
  }
  throw Error(`Accompaniment ${JSON.stringify(accompanimentData)} could not be created.`);
}

export async function getAccompanimentAtId(id, token) {
  const result = await fetch(`${backendUrl}/accompaniments/${id}`, {
    method: 'get',
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });
  if (result.ok) {
    return result.json();
  }
  throw Error(`getAccompanimentAtId ${id} was unsuccessful`);
}

export async function getCart(token) {
  const result = await fetch(`${backendUrl}/user/cart`, {
    method: 'get',
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });
  if (result.ok) {
    return result.json();
  }
  throw Error('getCart was unsuccessful');
}

export async function getAccompanimentFileAtId(id, token) {
  const result = await fetch(`${backendUrl}/accompaniments/files/${id}`, {
    method: 'get',
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });
  if (result) {
    return result;
  }
  throw Error(`getAccompanimentDownloadAtId ${id} was unsuccessful`);
}

export async function addAccompanimentToCart(accompanimentId, token) {
  const result = await fetch(`${backendUrl}/user/addToCart`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ accompanimentId }),
  });
  if (result) {
    return result.json();
  }
  throw Error(`addAccompanimentToCart ${accompanimentId} was unsuccessful`);
}

export async function removeAccompanimentFromCart(accompanimentId, token) {
  const result = await fetch(`${backendUrl}/user/removeFromCart`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ accompanimentId }),
  });
  if (result) {
    return result.json();
  }
  throw Error(`removeAccompanimentFromCart ${accompanimentId} was unsuccessful`);
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

export async function getSongViaAutocomplete({
  titleSearchValue, composerSearchValue, songSetSearchValue, sortBy, page,
}) {
  const result = await fetch(`${backendUrl}/songs/search`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      titleSearchValue, composerSearchValue, songSetSearchValue, sortBy, page,
    }),
  });

  if (result.ok) {
    return result.json();
  }
  throw Error(`getSongViaAutocomplete ${titleSearchValue}, ${composerSearchValue} was unsuccessful`);
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

export async function getSongTitles() {
  const result = await fetch(`${backendUrl}/admin/getSongTitles`, {
    method: 'get',
  });
  if (result.ok) {
    return result.json();
  }
  throw Error('getSongTitles was unsuccessful');
}

export async function pruneSongs() {
  const result = await fetch(`${backendUrl}/admin/pruneSongs`, {
    method: 'get',
  });
  if (result.ok) {
    return result.json();
  }
  throw Error('pruneSongs was unsuccessful');
}
