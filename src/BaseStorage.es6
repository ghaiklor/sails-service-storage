const IMPLEMENT_MESSAGE = 'You should implement this method';

export default class BaseStorage {
  upload() {
    throw new Error(IMPLEMENT_MESSAGE);
  }

  get() {
    throw new Error(IMPLEMENT_MESSAGE);
  }

  remove() {
    throw new Error(IMPLEMENT_MESSAGE);
  }
}
