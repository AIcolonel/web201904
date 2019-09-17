<div class="modal close">
    <div class="modal-container">
        <div class="modal-header">
            {{#_id}}
            <h2 class="modal-title">编辑地址</h2>
            {{/_id}}
            {{^_id}}
            <h2 class="modal-title">新增地址</h2>
            {{/_id}}            
            <i class="fa fa-close close-icon close"></i>
        </div>
        <div class="modal-body">
            <div class="form">
                <div class="form-box">
                    <div class="error-item">
                        <i class="fa fa-minus-circle error-icon"></i>
                        <p class="error-msg">error</p>
                    </div>
                    <div class="form-item">
                        <label for="" class="form-lable">
                            <i class="fa fa-user"></i>
                        </label>
                        <input type="text" class="form-content" name="name" placeholder="请输入收货人姓名" value="{{name}}">
                    </div>
                    <div class="form-item city-item">
                        <label for="" class="form-lable">
                            <i class="fa fa-building"></i>
                        </label>
                        <select name="province" class="province-select">
                            <option value="">请选择</option>
                        </select>
                        <select name="city" class="city-select">
                            <option value="">请选择</option>
                        </select>
                    </div>
                    <div class="form-item">
                        <label for="" class="form-lable">
                            <i class="fa fa-map-marker"></i>
                        </label>
                        <input type="text" class="form-content" name="address" placeholder="请输入详细地址到门牌号" value="{{address}}">
                    </div>
                    <div class="form-item">
                        <label for="" class="form-lable">
                            <i class="fa fa-phone"></i>
                        </label>
                        <input type="text" class="form-content" name="phone" placeholder="请输入手机号" value="{{phone}}">
                    </div>
                    <div class="form-item">
                        <label for="" class="form-lable">
                            <i class="fa fa-envelope"></i>
                        </label>
                        <input type="text" class="form-content" name="zip" placeholder="请输入邮编,如100001" value="{{zip}}" >
                    </div>      
                    <div class="btn-item">
                        <a href="javascript:;" class="btn btn-submit" id="btn-submit">提交</a>
                    </div>  
                </div>                             
            </div>
        </div>
    </div>
</div>