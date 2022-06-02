<template>
	<u-popup mode="bottom" :show="show" @close="close" @open="open">
		<scroll-view class="zyf-tree-view-sc" :scroll-y="true">
			<view style="min-height: 600rpx; padding: 15px;">
				<view class="zyf-tree">
					<treeNode v-for="(item, index) in treeData" 
					:item="item" :key="item[defaultProps.id]"
					:klass="index === treeData.length-1?'tree-last':''"
					:row_index="index"
					:defaultProps="defaultProps"></treeNode>
				</view>
			</view>
		</scroll-view>
	</u-popup>
	
</template>
<script>
	import treeNode from './tree-node/tree-node.vue';
	export default {
		components:{
			treeNode
		},
		props: {
			data: {
				type: Array,
				default: () => {
					return []
				}
			},
			collapse:{
				type: Boolean,
				default:true
			},
			defaultProps: {
				type: Object,
				default: () => {
					return {
						id: 'id',
						children: 'children',
						label: 'label'
					}
				}
			}
		},
		provide(){
			return {
			  defaultProps: this.defaultProps,
			  onClickItem: this.onClickItem,
				onSelectItem: this.onSelectItem
			}
		},
		data() {
			return {
				show: false,
				treeData:[]
			}
		},
		created() {
			this.treeData = this.mapTree(this.data, null)
		},
		methods: {
			open() {
				this.show = true
			},
			close() {
				this.show = false
			},
			mapTree (data, item) {
				let arr = [];
				data.forEach(items => {
					 let obj = {
						 [this.defaultProps.label]:items[this.defaultProps.label],
						 [this.defaultProps.id]: items[this.defaultProps.id],
						 checked: this.isChecked(items.ID, item),
						 opened: items.opened || this.collapse,
						 [this.defaultProps.children]: []
					 };
					if (items[this.defaultProps.children]) {
						obj[this.defaultProps.children] = this.mapTree(items[this.defaultProps.children], item)
					}
					arr.push(obj)
				})
				return arr;
			},
			
			isChecked(id, item){
				if(item){
					if(id != item.ID){
						return false
					} else {
						return true
					}
				}
				return false
			},
			
			onSelectItem(item, index){
				this.treeData = this.mapTree(this.data, item)
			},
			
			onClickItem(e) {
				this.$emit('node-click', e);
			}
		}
	}
</script>
<style scoped>
	
</style>
