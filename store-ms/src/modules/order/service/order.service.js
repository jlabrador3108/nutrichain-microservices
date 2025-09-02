import { order as _order } from '../prisma/client';
import { checkStock, deductStock } from './warehouseService';
import { acquireLock, releaseLock } from '../utils/concurrencyLock';

async function createOrder({ customer, date, items }) {
    // 1. Crear un lock global por cada producto para concurrencia
    const productIds = items.map(i => i.productId).sort();
    for (let pid of productIds) await acquireLock(pid);

    try {
        // 2. Validar stock con Warehouse
        const stockCheck = await checkStock(items);
        if (!stockCheck.available) {
            throw new Error('Stock insuficiente: ' + JSON.stringify(stockCheck.details));
        }

        // 3. Guardar el pedido
        const order = await _order.create({
            data: {
                customer,
                date,
                items: {
                    create: items.map(i => ({
                        productId: i.productId,
                        quantity: i.quantity
                    }))
                },
                status: 'CONFIRMED'
            }
        });

        // 4. Notificar al warehouse para descontar stock
        await deductStock(items);

        return order;
    } finally {
        // 5. Liberar locks
        for (let pid of productIds) releaseLock(pid);
    }
}

export default { createOrder };
