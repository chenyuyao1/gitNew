CalSwitcherDetailPanel = function() {
	var me=this;
	var sdependence="neo4jQueryService";
	var ssrc="srcDependenceService";
	var sanal="analystJobService";
	var ssclassData=[['cal','CalSwitcher����'],['print','StatusPrintSwitcher����'],['master','MasterSwitcher����'],
	                 ['jmx','JMXQuerySwitcher����'],['jumperUrl','JumperUrlSwitcher����'],['logPath','LogPathSwitcher����'],
	                 ['logSend','LogSendSwitcher����'],['notPut','NotPutHbaseFilterSwitcher����'],
	                 ['jumperMongo','JumperMongoSwitcher����'],['mod','ModHbaseFilterSwitcher����'],
	                 ['logPrint','LogPrintFilterSwitcher����'],
	                 ['jumperCtr','ConsumerCtrlSwitcher����'],
	                 ['JQFilter','JQJumperMessageFilter����'],
	                 ['SensitiveSwitcher','SensitiveSwitcher����'],
	                 ['transconfig','JumperTransferConfigSwitcher����'],
	                 ['srcDependenceService','dependenceData���أ�������·��ϵ�������ɿ��أ�'],
	                 ['neo4jQueryService','dependenceLinkGraph���أ�������·��ϵͼ���ɿ��أ�']
	           //      ['analystJobService','method_analyse_hour���أ��������ݣ�']
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
		title : 'ִ�н��',
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
			fieldLabel : '�����������',
			xtype : 'textarea',
			disabled:false,
			readOnly:false,
			anchor : '65%',
		},{
	
			name : 'describe',
			id:'desc_id',
			fieldLabel : '����',
			anchor : '65%',
			xtype : 'textarea'
		},{
			id:'result_id',
			name : 'result',
			anchor : '65%',
			fieldLabel : 'ִ�н��',
			xtype : 'textarea'
		},{
			id:'info_id',
			name : 'infomation',
			anchor : '65%',
			fieldLabel : '��ϸ��Ϣ',
			xtype : 'textarea'
		}]
		}]
	});
	this.queryForm = new Ext.form.FormPanel({
		title : '������Ϣ��ѯ',
		frame : true,
		region : 'north',
		labelAlign : 'right',
		//Ϊform�����ӻس���Ӧ����
		keys: [{
		    key: Ext.EventObject.ENTER,//13����س�
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
					fieldLabel : '������',
					id : 'sclass_id',
					name:'sclass',
					xtype : 'combo',
					value:'��ѡ��....',
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
								//var ssclass=Ext.getCmp("sclass_id").getValue(); //��this.getValue�����õ���ֵ��һ����
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
					fieldLabel : '������',
					id : 'method_id',
					name:'method',
					xtype : 'textfield',
					value:'logic',
			        selectOnFocus:true,
					anchor : '98%',
					mode:'local'
				}]
			}],buttons : [{
				text : '��ѯ',
				scope : this,
				handler : function () {
					this.ok();
				}
			},{
				text : '���',
				handler : function () {
					this.queryForm.getForm().reset();
				},
				scope : this
			}]
		}]
	});
	CalSwitcherDetailPanel.superclass.constructor.call(this, {
		id : 'SwitcherDetail',
		title : 'detector����',
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
		title : 'ִ�н��',
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
			fieldLabel : '�����������',
			xtype : 'textarea',
			disabled:false,
			readOnly:false,
			anchor : '60%',
		},{
	
			name : 'describe',
			id:'desc_id',
			fieldLabel : '����',
			anchor : '60%',
			xtype : 'textarea'
		},{
			id:'result_id',
			name : 'result',
			anchor : '60%',
			fieldLabel : 'ִ�н��',
			xtype : 'textarea'
		},{
			id:'info_id',
			name : 'infomation',
			anchor : '60%',
			fieldLabel : '��ϸ��Ϣ',
			xtype : 'textarea'
		}]
		}]
	});
	SwitcherPanel.superclass.constructor.call(this, {
		id : 'switcherpanel',
		title : '������Ϣ',
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
				yes:'ȷ��',
				no:'ȡ��',
				ok:'ȷ��',
				cancel:'ȡ��'
				};
		Ext.Msg.confirm("��ʾ","ȷ��Ҫ����ִ����",function(btn){
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
			    	Ext.Msg.alert("ִ��ʧ��!");
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
//		    	Ext.Msg.alert("ִ��ʧ��!");
//		    }  
//		});

	},
	init : function() {
		FW.fire('CalSwitcherDetailPanel.open', this);
	}

});

Ext.reg("OpenAPI", CalSwitcherDetailPanel);