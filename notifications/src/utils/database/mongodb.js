import mongoose from 'mongoose';

export async function create(params, collectionName) {
  collectionName = mongoose.model(`${collectionName}`);
  return collectionName
    .create(params)
    .then(results => {
      return results;
    })
    .catch(err => {
      throw new Error(err);
    });
}

export async function findNewest(collectionName) {
  collectionName = mongoose.model(`${collectionName}`);
  return collectionName
    .findOne({}, {}, { sort: { createdAt: -1 } })
    .then(results => {
      return results;
    })
    .catch(err => {
      throw new Error(err);
    });
}
export async function find(collectionName) {
  collectionName = mongoose.model(`${collectionName}`);
  return collectionName
    .find({})
    .then(results => {
      return results;
    })
    .catch(err => {
      throw new Error(err);
    });
}

export async function update(id, params, collectionName) {
  collectionName = mongoose.model(`${collectionName}`);
  return collectionName
    .update(params)
    .then(results => {
      return results;
    })
    .catch(err => {
      throw new Error(err);
    });
}

export async function deleteAll(collectionName) {
  collectionName = mongoose.model(`${collectionName}`);
  return collectionName.collection.drop();
}
