# zyf-tree
####  数据 data:{ type:Array, default:[]}
####  配置选项 defaultProps:{type:Object, default:{ id: 'id', label: 'label', children: 'children' }}
####  是否全部展示 collapse {	type: Boolean,	default:true }
#### emit 
#### @node-click 监听选中变化，返回选中的数据


### 使用
#### 本组件符合easycom规范，HBuilderX 3.4.6起，只需将本组件导入项目，在页面template中即可直接使用，无需在页面中import和注册components。
```javascript
	template
	<zyf-tree ref="tree" :data="data" @node-click="nodeClick"></zyf-tree>
	
	methods
	###点击弹出：this.$refs.tree.open()
	nodeClick(e) {
		console.log('点击选中事件', e);
	}
	
```