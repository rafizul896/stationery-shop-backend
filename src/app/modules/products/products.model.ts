import { model, Schema } from 'mongoose';
import { IProduct, IReview } from './products.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number.'],
    },
    category: {
      type: String,
      enum: {
        values: [
          'Writing',
          'Office Supplies',
          'Art Supplies',
          'Educational',
          'Technology',
        ],
        message:
          'Category must be one of Writing, Office Supplies, Art Supplies, Educational, or Technology',
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [0, 'Quantity cannot be negative.'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'InStock status is required.'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image is required.'],
    },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        comment: { type: String },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.id; // Remove `id` from main object
        if (ret.reviews) {
          ret.reviews.forEach((review: IReview) => delete review.id); // Remove `id` from reviews
        }
        return ret;
      },
    },
  },
);

//virtual
productSchema.virtual('averageRating').get(function () {
  if (this?.reviews && this?.reviews.length > 0) {
    const totalRating = this.reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    return (totalRating / this.reviews.length).toFixed(2); // Round to 2 decimal places
  }
  return 0;
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
