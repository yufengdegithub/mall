/**
 * Created by ZD on 2018/6/28.
 */
import React from 'react';
import MUtil from 'util/mm.jsx';
import Product  from  'service/product-service.jsx';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelect from './category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';

import './save.scss';

const _mm   = new MUtil();
const _product = new Product();

class ProductSave extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryId       : 0,
            parentCategoryId : 0,
            subImages         : []
        }
    }
    //品类选择器的变化
    onCategoryChange(categoryId,parentCategoryId){
        console.log(categoryId,parentCategoryId)
    }
    //上传图pain成功
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages : subImages
        });
    }
    //上传图pain失败
    onUploadError(errMsg){
        _mm.errorTips(errMsg);
    }

    //删除图片
    onImageDelete(e){
        let index      = parseInt(e.target.getAttribute('index')),
            subImages  = this.state.subImages;
        subImages.splice(index,1);
        this.setState({
            subImages : subImages
        });
    }

    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label  className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="email" className="form-control"  placeholder="请输入商品名称"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="password" className="form-control"  placeholder="请输入商品描述"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">所属分类</label>
                        <CategorySelect onCategoryChange={
                            (categoryId,parentCategoryId)=>this.onCategoryChange(categoryId,parentCategoryId)}/>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"  placeholder="价格"/>
                                <span className="input-group-addon" >元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"  placeholder="库存"/>
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length ? this.state.subImages.map(
                                    (image,index)=>(
                                        <div key={index} className="img-con">
                                            <img src={image.url}/>
                                            <i className="fa fa-close" index={index} onClick={(e)=>this.onImageDelete(e)}></i>
                                        </div>)
                                ) : (<div>请上传图片</div>)
                            }
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUploader onSuccess={(res)=>{this.onUploadSuccess(res)}}
                                          onError={(errMsg)=>{this.onUploadError(errMsg)}}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            xxx
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary">提交</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default  ProductSave;
