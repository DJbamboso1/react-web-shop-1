export const useOrderStatus = ( status: number ) => {
    let sta = ''
    switch (status) {
        case -1: {
            sta = 'Đang thành tiền'
            return sta
        }
        case 0: {
            sta = 'Hủy'
            return sta
        }
        case 1: {
            sta =  'Đã thành tiền'
            return sta
        }
        case 2: {
            sta = 'Chưa thành tiền'
            return sta
        }
    }
    return sta
}