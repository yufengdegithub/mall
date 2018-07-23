import React from 'react';
import Simditor  from 'simditor';
import 'simditor/styles/simditor.scss';

class  RichEditor extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.loadEditor();
    }
    loadEditor(){
        let element = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea : $(element),
            defaultValue: this.props.placeholder || '请输入内容',
            upload : {
                url : '/manage/product/richtext_img_upload.do',
                defaultImage: '',
                filekey : 'upload_file'
            }
        });
        this.bindEditorEvent();
    }
    bindEditorEvent(){
        this.simditor.on('valuechanged',e=>{
            this.props.onValueChange(this.simditor.getValue());
        })
    }
    render(){
        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        );
    }
}


export default RichEditor;