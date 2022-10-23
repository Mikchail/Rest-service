const { Schema, model } = require('mongoose');

const ConversationSchema = new Schema({
  members: [
    {
      type: String,
    },
  ],
  messages: [
    {
      message: {
        type: String,
      },
      senderID: {
        type: Schema.ObjectId,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      type: {
        type: String,
      },
    },
  ],
  ownerID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const populationFields = 'ownerID'

ConversationSchema.post('save', async (doc) => {
  await doc.populate(populationFields).execPopulate()
})

function populateFields() {
  this.populate(populationFields)
}

ConversationSchema.pre('find', populateFields)
ConversationSchema.pre('findOne', populateFields)
ConversationSchema.pre('findOneAndUpdate', populateFields)


module.exports = model('Conversation', ConversationSchema)