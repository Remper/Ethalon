/*
 * jQuery ethalon pattern v1.0
 * http://remper.ru/ethalon
 * 
 * Copyright (c) 2012 Yaroslav Nechaev
 * Licensed under a CC BY-SA 3.0.
 * http://creativecommons.org/licenses/by-sa/3.0/
 */
(function($) {
    $.fn.ethalon = function() {
        this.detach();
        return new (function(obj) {
            this._ethalon = obj;
            this._data = null;
            this._target = null;
            
            //Loading data into the cloned object and attach
            this._loadData = function(target, data) {
                var obj = this._ethalon.clone();
                
                if (data) {
                    $.each(data, function(key, value) {
                        obj.find("[data-ethalon=\""+key+"\"]").html(value);
                    });
                }
                
                $(target).append(obj);
            }
            
            //Clone object, load default data and attach it to the target
            this.cloneTo = function(target) {
                if (!target) {
                    if (!this._target)
                        return this;
                    else
                        target = this._target;
                }
                
                this._loadData(target, this._data);
                
                return this;
            }
            
            //Clone object, load data and attach it to the default target
            this.cloneWithData = function(data) {
                if (!data && this._data)
                    data = this._data;
                
                if (!this._target)
                    return this;
                
                this._loadData(this._target, data);
                
                return this;
            }
            
            this.clone = function(target, data) {
                if (!target)
                    return this.cloneWithData(data);
                if (!data)
                    return this.cloneTo(target);
                    
                this._loadData(target, data);
                
                return this;
            }
            
            //Defaults managing
            this.data = function(data) {
                this._data = data;

                return this;
            }
            this.target = function(target) {
                this._target = target;
                
                return this;
            }
            this.defaults = function(data, target) {
                this._data = data;
                this._target = target;
                
                return this;
            }
        })(this);
    }
})(jQuery)