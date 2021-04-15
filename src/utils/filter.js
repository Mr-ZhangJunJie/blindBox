export function transformCount(val){
    return (val<1000)?val:`${val}`.replace(/(\d{3})$/,',$1');
}
