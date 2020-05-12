import request from '../utils/request';

export function getPayUrl(amount,deposit_id,Id) {
  return request(`/api/alipay/getpayurl?amount=${amount}&Id=${Id}&deposit_id=${deposit_id}`)
}
export function isSucc(Id) {
  return request(`/api/alipay/isSucc?Id=${Id}`)
}
export function login(username, password) {
  return request('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      telePhone_val:username,
      passwd_val:password
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
export function query() {
  return request('/api/secondHand/admin');
}
export function sQuery(searchkey, searchVal) {
  return request(`/api/secondHand/admin?${searchkey}=${searchVal?searchVal:''}`)
}
export function sAdd(entity) {
  return request('/api/secondHand/admin', {
    method: 'POST',
    body: JSON.stringify(entity),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
export function sDele(Id) {
  return request('/api/secondHand/admin', {
    method: 'Delete',
    body: JSON.stringify({Id}),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
export function sUpdate(entity) {
  return request('/api/secondHand/admin', {
    method: 'Put',
    body: JSON.stringify(entity),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function chatQuery(searchkey, searchVal) {
  return request(`/api/chats/admin?${searchkey}=${searchVal?searchVal:''}`)
}
export function chatAdd(entity) {
  return request('/api/chats/admin', {
    method: 'POST',
    body: JSON.stringify(entity),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
export function chatUpdate(entity) {
  return request('/api/chats/admin', {
    method: 'Put',
    body: JSON.stringify(entity),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
export function chatDele(Id) {
  return request('/api/chats/admin', {
    method: 'Delete',
    body: JSON.stringify({Id}),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function jobQuery(searchkey, searchVal) {
  return request(`/api/jobs/admin?${searchkey}=${searchVal?searchVal:''}`)
}
export function jobAdd(entity) {
  return request('/api/jobs/admin', {
    method: 'POST',
    body: JSON.stringify(entity),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
export function jobUpdate(entity) {
  return request('/api/jobs/admin', {
    method: 'Put',
    body: JSON.stringify(entity),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
export function jobDele(Id) {
  return request('/api/jobs/admin', {
    method: 'Delete',
    body: JSON.stringify({Id}),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function userQuery(searchkey, searchVal) {
  return request(`/api/users/admin?${searchkey}=${searchVal?searchVal:''}`)
}
export function userAdd(entity) {
  return request('/api/users/admin', {
    method: 'POST',
    body: JSON.stringify(entity),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
export function userUpdate(entity) {
  return request('/api/users/admin', {
    method: 'Put',
    body: JSON.stringify(entity),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
export function userDele(Id) {
  return request('/api/users/admin', {
    method: 'Delete',
    body: JSON.stringify({Id}),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}