class MUtil{
       request(param){
           return new Promise((resolve,reject)=>{
               $.ajax({
                   type:     param.type      ||  'get',
                   url:      param.url       ||  '',
                   dataType: param.dataType  ||  'json',
                   data:     param.data      ||  null,
                   success  : res => {
                       //数据请求成功
                       if(0 === res.status){
                           typeof resolve === 'function' && resolve(res.data,res.data);
                       }
                       //没有登录状态，强制登陆
                       else if(10 === res.status){
                           this.doLogin();
                       }
                       else{
                           typeof reject === 'function' && reject(res.msg||res.msg);
                       }
                   },
                   error: err => {
                       typeof reject === 'function' && reject(err.statusText);
                   }

               });
           });

       }
       //跳转成功
        doLogin(){
            window.location.href='/login?redirect'+encodeURIComponent(window.location.pathname)
        }
        //获取url参数
         getUrlParam(name){
             //
             let queryString = window.location.search.split('?')[1] || '',
                  reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
                  result = queryString.match(reg);
             return result? decodeURIComponent(result[2]) : null;
         }
        //成功提示
        successTips(successMsg){
            alert(successMsg || '操作成功~');
        }
         //错误提示
         errorTips(errMsg){
             alert(errMsg || '好像哪里不对');
         }
         //存储
         setStorage(name,data){
             let dadaType = typeof data;
             //json对象
             if(dadaType === 'object'){
                 window.localStorage.setItem(name,JSON.stringify(data));
             }
             //基础对象
             else if(['number','string','boolean'].indexOf(dataType)>=0){
                 window.localStorage.setItem(name,data);
             }
             else{
                 alert('该类型不支持本地储存')
             }

         }

         //取出存储内容
         getStorage(name){
             let data = window.localStorage.getItem(name);
             if(data){
                 return JSON.parse(data);
             }
             else{
                 return '';
             }
         }
         //删除本地存储
         removeStorage(name){
             window.localStorage.removeItem(name);
         }



}

export default  MUtil;