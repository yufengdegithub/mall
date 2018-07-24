import MUtil from 'util/mm.jsx';

const _mm   = new MUtil();

class Product{
    //获取用户列表
    getProductList(listParam){
        let url  = '',
            data = {};
        if(listParam.listType === 'list'){
            url          = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url          = '/manage/product/search.do';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.keyword;
        }


        return _mm.request({
            type: 'post',
            url:  url,
            data:data
        });
    }
    //获取商品详情
    getProduct(productId){
        return _mm.request({
            type: 'post',
            url:  '/manage/product/detail.do',
            data: {
                productId: productId || 0
            }
        });
    }
 //变更商品状态
    setProductStatus(productInfo){
        return _mm.request({
            type: 'post',
            url:  '/manage/product/set_sale_status.do',
            data: productInfo
        });
    }
    //检查表单数据
    checkProduct(product){
        let result = {
            status : true,
            msg: '验证通过'
        };
        //判断用户名不能为空
        if(typeof product.name !== 'string' || product.name.length == 0){
            return{
                status: false,
                msg: '商品名不能为空！'
            }
        }
        //判断描述不能为空
        if(typeof product.subtitle !== 'string' || product.subtitle.length == 0){
            return{
                status: false,
                msg: '商品描述不能为空！'
            }
        }
        //品类ID
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return{
                status: false,
                msg: '请选择商品品类!'
            }
        }
        //判断价格位数字且大于零
        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return{
                status: false,
                msg: '请输入正确的商品价格!'
            }
        }
        //判断库存位数字且大于零
        if(typeof product.stock !== 'number' || !(product.stock >= 0)){
            return{
                status: false,
                msg: '请输入正确的库存数量!'
            }
        }

        return result;
    }
    saveProduct(product){
        return _mm.request({
            type: 'post',
            url:  '/manage/product/save.do',
            data: product
        });
    }
    //品类相关
    getCategoryList(parentCategoryId){
        return _mm.request({
            type: 'post',
            url:  '/manage/category/get_category.do',
            data: {
                categoryId : parentCategoryId || 0
            }
        });
    }

}

export default  Product;