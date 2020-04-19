import { getCustomRepository, DeleteResult } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<DeleteResult> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const checkTransactionExists = await transactionsRepository.findOne({
      where: { id },
    });

    if (!checkTransactionExists) {
      throw new AppError("Transaction doesn't exists.");
    }

    const deletedTransaction = await transactionsRepository.delete({ id });

    return deletedTransaction;
  }
}

export default DeleteTransactionService;
