import { Prodact, Rating } from '../models/models.js';

class RatingService {
  async create(rating, prodactId, userId) {
    await Rating.create({ rate: rating, prodactId, userId });
    const ratingById = await Rating.findAll({ where: { prodactId } });

    const ratings = ratingById.reduce((acc, item) => acc + item.rate, 0);

    let updatedRating;
    ratingById.length
      ? (updatedRating = ratings / ratingById.length)
      : (updatedRating = rating);

    const prodact = await Prodact.update(
      {
        rating: updatedRating,
      },
      { where: { id: prodactId } }
    );
    return updatedRating;
  }

  async checkVote(prodactId, userId) {
    const curentUserRating = await Rating.findOne({
      where: { prodactId, userId },
    });
    if (!!curentUserRating)
      return { message: "Вашу оцінку цього товару вже враховано" };
    return null;
  }

  async getRating(prodactId) {
    const curentProdact = await Prodact.findOne({ where: { id: prodactId } });
    return curentProdact.rating;
  }
}

export const ratingService = new RatingService();
