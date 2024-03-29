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

export async function requestAccompaniment(songId, token) {
  const result = await fetch(`${backendUrl}/song/request`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: songId }),
  });
  if (result.ok) {
    return result.json();
  }
  throw Error(`Song ${JSON.stringify(songId)} could not be requested for accompaniment.`);
}

export async function unrequestAccompaniment(songId, token) {
  const result = await fetch(`${backendUrl}/song/unrequest`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: songId }),
  });
  if (result.ok) {
    return result.json();
  }
  throw Error(`Song ${JSON.stringify(songId)} could not be unrequested for accompaniment.`);
}

export async function getRequestedAccompaniments(page = 1, sortByRecency = false) {
  const result = await fetch(`${backendUrl}/songsByRequest?page=${page}&sortByRecency=${sortByRecency}`, {
    method: 'get',
  });

  if (result.ok) {
    return result.json();
  }
  throw Error('getRequestedAccompaniments was unsuccessful');
}

export async function addAccompaniment(accompanimentData, token) {
  const result = await fetch(`${backendUrl}/accompaniment/create`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    // This is formData, do not stringify
    body: accompanimentData,
  });
  if (result.ok) {
    return result.json();
  }
  throw Error(`Accompaniment ${JSON.stringify(accompanimentData)} could not be created.`);
}

export async function rateAccompaniment(accompanimentId, rating, token) {
  const result = await fetch(`${backendUrl}/accompaniment/rate`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ accompanimentId, rating }),
  });
  if (result.ok) {
    return result.json();
  }
  throw Error(`Accompaniment ${accompanimentId} could not be rated.`);
}

export async function createSale(saleData, token) {
  const result = await fetch(`${backendUrl}/sale`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(saleData),
  });
  if (result.ok) {
    return result.json();
  }
  return new Error(`Accompaniment ${JSON.stringify(saleData)} could not be created.`);
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

export async function getUserInfo(token) {
  const result = await fetch(`${backendUrl}/user/info`, {
    method: 'get',
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });
  if (result.ok) {
    return result.json();
  }
  throw Error('getUserInfo was unsuccessful');
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

export async function getSongsBySearchParams({
  titleSearchValue, composerSearchValue, songSetSearchValue, sortBy, page,
}) {
  let url = `${backendUrl}/search?sortBy=${sortBy}&page=${page}`;
  if (titleSearchValue) {
    url = `${url}&titleSearchValue=${titleSearchValue}`;
  }
  if (composerSearchValue) {
    url = `${url}&composerSearchValue=${composerSearchValue}`;
  }
  if (songSetSearchValue) {
    url = `${url}&songSetSearchValue=${songSetSearchValue}`;
  }
  const result = await fetch(url, {
    method: 'get',
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
