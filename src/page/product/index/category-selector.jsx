/**
 * Created by ZD on 2018/6/28.
 */
import React from 'react';
import MUtil from 'util/mm.jsx';
import Product  from  'service/product-service.jsx'

const _mm   = new MUtil();
const _product = new Product();
import './category-selector.scss';

//品类选择器
class CategorySelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstCategoryList  : [],
            firstCategoryId    : 0,
            secondCategoryList : [],
            secondCategoryId    : 0
        }
    }

    componentDidMount(){
        this.loadFirstCategory();
    }
    //加载一级分类
    loadFirstCategory(){
         _product.getCategoryList().then(res=> {
             this.setState({
                 firstCategoryList : res
             });
         },errMsg=>{
             _mm.errorTips(errMsg)
         });
    }

    //加载二级品类
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res=> {
            this.setState({
                secondCategoryList : res
            });
        },errMsg=>{
            _mm.errorTips(errMsg)
        });
    }

    //选择一级品类
    onFirstCategoryChange(e){
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId   : newValue,
            secondCategoryId  : 0,
            secondCategoryList: []
        },()=>{
            //更新二级品类
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
    }
    //选择二级品类
    onSecondCategoryChange(e){
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId   : newValue
        },()=>{
            this.onPropsCategoryChange();
        })
    }
    //传给负组件选中的结果
    onPropsCategoryChange(){
        //判断props回掉函数是否存在
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
       //如果是有二级品类
        if(this.state.secondCategoryId){
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId);
        }
        //如果只有一级品类
        else{
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId,0);
        }
    }

    render(){
        return (
            <div className="col-md-5">
                <select className="form-control cate-select"
                     onChange={(e)=>this.onFirstCategoryChange(e)}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map(
                            (category,index)=><option value={category.id} key={index}>{category.name}</option>
                        )
                    }
                </select>
                {this.state.secondCategoryList.length ?
                    (<select name="" className="form-control cate-select"
                        onChange={(e)=>this.onSecondCategoryChange(e)}>
                        <option value="">请选择二级分类</option>
                        {
                            this.state.secondCategoryList.map(
                                (category,index)=><option value={category.id} key={index}>{category.name}</option>
                            )
                        }
                    </select>)
                    :null
                }

            </div>
        )
    }
}


export default  CategorySelector;
