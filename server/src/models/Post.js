const { Schema, model } = require('mongoose');
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    dafault: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})

const populationFields = 'author'

PostSchema.post('save', async (doc) => {
  await doc.populate(populationFields).execPopulate()
})

function populateFields() {
  this.populate(populationFields)
}

PostSchema.pre('find', populateFields)
PostSchema.pre('findOne', populateFields)
PostSchema.pre('findOneAndUpdate', populateFields)


module.exports = model('Post', PostSchema)