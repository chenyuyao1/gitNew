CalSwitcherDetailPanel = function() {
	var me=this;
	var sdependence="neo4jQueryService";
	var ssrc="srcDependenceService";
	var sanal="analystJobService";
	var ssclassData=[['cal','CalSwitcher开关'],['print','StatusPrintSwitcher开关'],['master','MasterSwitcher开关'],
	                 ['jmx','JMXQuerySwitcher开关'],['jumperUrl','JumperUrlSwitcher开关'],['logPath','LogPathSwitcher开关'],
	                 ['logSend','LogSendSwitcher开关'],['notPut','NotPutHbaseFilterSwitcher开关'],
	                 ['jumperMongo','JumperMongoSwitcher开关'],['mod','ModHbaseFilterSwitcher开关'],
	                 ['logPrint','LogPrintFilterSwitcher开关'],
	                 ['jumperCtr','ConsumerCtrlSwitcher开关'],
	                 ['JQFilter','JQJumperMessageFilter开关'],
	                 ['SensitiveSwitcher','SensitiveSwitcher开关'],
	                 ['transconfig','JumperTransferConfigSwitcher开关'],
	                 ['srcDependenceService','dependenceData开关（依赖链路关系数据生成开关）'],
	                 ['neo4jQueryService','dependenceLinkGraph开关（依赖链路关系图生成开关）']
	           //      ['analystJobService','method_analyse_hour开关（生成数据）']
	];
	var dependenceMethod=[['init','init'],['clean','clean']];
	
	var paramData=[['calEnabled=appcode,true&needToSendCalLogInfoWhenSuccess=appcode,true','cal'],
	               ['m=all|desc|cal,master,logpath,logsend,jumperUrl,notPut','print'],
	               ['m=master|notify|mail|bak&ip=192.168.1.1','master'],
	               ['host=10.161.144.68&port=3997&command=d','jmx'],['m=add,del&url=','jumperUrl'],
	               ['app=/domain&m=delete|add','logPath'],['app=/domain&m=addNotSend|delNotSend','logSend'],
	               ['m=add|del|&appCode=yihaodian/gps','notPut'],
	               ['m=add,del&index=&g=','jumperMongo'],
	               ['m=add|del|&mod=10','mod'],
	               ['m=add|del|&appCode=yihaodian/gps:253','logPrint'],
	               ['m=stop&t=dalqueue&c=dalqueueConsumer','jumperCtr'],['m=true|false','JQFilter'],
	               ['m=add|del&c=m','SensitiveSwitcher'],
	               ['m=modify&cns=2&cps=3&wtns=10&tqmax=100&tqmin=50&N2J=0.01&J2N=0.01','transconfig'],
	               ['src','srcDependenceService'],
	               ['neo','neo4jQueryService']
	          //     ['anal','analystJobService']
	               
	];
	
	var classStore=new Ext.data.SimpleStore({
		fields:['value','text'],
		data:paramData
	});
	var methodStore=new Ext.data.SimpleStore({
		fields:['value','text'],
		data:dependenceMethod
	});
	me.paraStore=new Ext.data.SimpleStore({
		fields:['class','param'],
		data:ssclassData
	});
	this.resultForm = new Ext.form.FormPanel({
		title : '执行结果',
		frame : true,
		region : 'north',
		labelAlign : 'right',
		buttonAlign : 'center',
		height : 550,
		items : [{
			layout : 'form',
			items:[{
			id :'pparam',
			name : 'inparam',
			fieldLabel : '输入操作参数',
			xtype : 'textarea',
			disabled:false,
			readOnly:false,
			anchor : '65%',
		},{
	
			name : 'describe',
			id:'desc_id',
			fieldLabel : '描述',
			anchor : '65%',
			xtype : 'textarea'
		},{
			id:'result_id',
			name : 'result',
			anchor : '65%',
			fieldLabel : '执行结果',
			xtype : 'textarea'
		},{
			id:'info_id',
			name : 'infomation',
			anchor : '65%',
			fieldLabel : '详细信息',
			xtype : 'textarea'
		}]
		}]
	});
	this.queryForm = new Ext.form.FormPanel({
		title : '开关信息查询',
		frame : true,
		region : 'north',
		labelAlign : 'right',
		//为form表单增加回车响应功能
		keys: [{
		    key: Ext.EventObject.ENTER,//13代表回车
		    fn: this.ok,
		    scope:this
		}],
		buttonAlign : 'center',
		height : 120,
		items : [{
			layout : 'column',
			items : [{
				layout : 'form',
				columnWidth : .25,
				items : [{
					fieldLabel : '开关名',
					id : 'sclass_id',
					name:'sclass',
					xtype : 'combo',
					value:'请选择....',
					store: classStore,
			        valueField: 'value',
			        displayField: 'text',
			        selectOnFocus:true,
					anchor : '98%',
					mode:'local',
					triggerAction:'all',
					listeners : {
							'select' : function() {
								var value=this.getValue();
								//var ssclass=Ext.getCmp("sclass_id").getValue(); //与this.getValue（）得到的值是一样的
								var text = this.getRawValue();
								Ext.getCmp("info_id").reset();
								Ext.getCmp("result_id").reset();
								Ext.getCmp("pparam").reset();
								var total=me.paraStore.getTotalCount();
								
								if(text==sdependence)
									Ext.getCmp("method_id").setValue("init");
								else if(text==ssrc)
									Ext.getCmp("method_id").setValue("initSoaDependences");
								else{
									Ext.getCmp("method_id").setValue("logic");
									Ext.getCmp("pparam").setValue(value);
								}
								for(var i=0;i<total;i++){
									var cl=me.paraStore.getAt(i).get("class");
									if(cl==text){
										var de=me.paraStore.getAt(i).get("param");
										Ext.getCmp("desc_id").setValue(de);
										break;
									}
								}
								//var de=me.paraStore.getAt(3).get("param");
								//Ext.getCmp("desc_id").setValue(total);
							}
					}
				}]
			},{
				layout:'form',
				items:[{
					fieldLabel : '方法名',
					id : 'method_id',
					name:'method',
					xtype : 'textfield',
					value:'logic',
			        selectOnFocus:true,
					anchor : '98%',
					mode:'local'
				}]
			}],buttons : [{
				text : '查询',
				scope : this,
				handler : function () {
					this.ok();
				}
			},{
				text : '清空',
				handler : function () {
					this.queryForm.getForm().reset();
				},
				scope : this
			}]
		}]
	});
	CalSwitcherDetailPanel.superclass.constructor.call(this, {
		id : 'SwitcherDetail',
		title : 'detector开关',
		margins : '5 5 5 5',
		cmargins : '5 5 5 5',
		closable : true,
		tbar : this.toolBar,
		layout : 'form',
		autoScroll : true,
		items : [this.queryForm,this.resultForm]
	});

};
SwitcherPanel=function(){
	 this.queryForm = new Ext.form.FormPanel({
		title : '执行结果',
		frame : true,
		region : 'north',
		labelAlign : 'right',
		buttonAlign : 'center',
		height : 550,
		items : [{
			layout : 'column',
			items:[{
			id :'pparam',
			name : 'inparam',
			fieldLabel : '输入操作参数',
			xtype : 'textarea',
			disabled:false,
			readOnly:false,
			anchor : '60%',
		},{
	
			name : 'describe',
			id:'desc_id',
			fieldLabel : '描述',
			anchor : '60%',
			xtype : 'textarea'
		},{
			id:'result_id',
			name : 'result',
			anchor : '60%',
			fieldLabel : '执行结果',
			xtype : 'textarea'
		},{
			id:'info_id',
			name : 'infomation',
			anchor : '60%',
			fieldLabel : '详细信息',
			xtype : 'textarea'
		}]
		}]
	});
	SwitcherPanel.superclass.constructor.call(this, {
		id : 'switcherpanel',
		title : '开关信息',
		margins : '5 5 5 5',
		cmargins : '5 5 5 5',
		closable : true,
		tbar : this.toolBar,
		layout : 'form',
		autoScroll : true,
		items : [this.queryForm]
	});
}
Ext.extend(CalSwitcherDetailPanel, Ext.Panel, {
	ok:function(){
		Ext.Msg.buttonText={
				yes:'确定',
				no:'取消',
				ok:'确定',
				cancel:'取消'
				};
		Ext.Msg.confirm("提示","确定要继续执行吗？",function(btn){
			var sscl=Ext.getCmp("sclass_id").getRawValue();
			var inParam=Ext.getCmp("pparam").getValue();
			var dependence="neo4jQueryService";
			var src="srcDependenceService";
			var anal="analystJobService";
			if(sscl==dependence||sscl==src||sscl==anal){
			var mmethod=Ext.getCmp("method_id").getValue();
			var params=Ext.encode({s : sscl, m : mmethod, p:''});
			//Ext.Ajax.timeout = 60000;
			Ext.Ajax.timeout = 2*60000;
			var myMask=new Ext.LoadMask(Ext.getBody(),{msg:"loading..."});
			myMask.show();
			
			
				Ext.Ajax.request({
					 method : 'POST',
				        url : 'ajax.do',
				        params : {
				            rmi : params
				        },
				        success:function(response,options){
				        	myMask.hide();
				        	var re = Ext.decode(response.responseText);
				        	if(re.result==""){
				        	Ext.getCmp("result_id").setValue("success");
							Ext.getCmp("info_id").setValue("");
				        	}else{
							Ext.getCmp("result_id").setValue(re.result);
					    	Ext.getCmp("info_id").setValue(re.info);
				        	}
					    },  
					    failure : function(form, action) {
					    	myMask.hide();
					    	Ext.getCmp("result_id").setValue("success");
							Ext.getCmp("info_id").setValue("");
					    }  
				});
			}else{
			Ext.Ajax.request({  
			    url : 'flog.do?switch='+sscl+'&'+inParam,
			    method : 'POST',
			    success : function(response, options) {
			    	var re = Ext.decode(response.responseText);
			    	Ext.getCmp("result_id").setValue(re.result);
			    	Ext.getCmp("info_id").setValue(re.info);
			    },  
			    failure : function(form, action) {
			    	Ext.Msg.alert("执行失败!");
			    }  
			});
			}
		});
	},
	query : function() {
//		var sscl=Ext.getCmp("sclass_id").getRawValue();
//		var inParam=Ext.getCmp("pparam").getValue();
//		Ext.Ajax.request({  
//		    url : 'flog.do?switch='+sscl+'&'+inParam,
//		    method : 'POST',  
//		    success : function(response, options) {
//		    	var re = Ext.decode(response.responseText);
//		    	Ext.getCmp("result_id").setValue(re.result);
//		    	Ext.getCmp("info_id").setValue(re.info);
//		    },  
//		    failure : function(form, action) {
//		    	Ext.Msg.alert("执行失败!");
//		    }  
//		});

	},
	init : function() {
		FW.fire('CalSwitcherDetailPanel.open', this);
	}

});

Ext.reg("OpenAPI", CalSwitcherDetailPanel);