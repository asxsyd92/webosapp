<template>
	<view class="tree-item">
		<view class="tree-node head" :class="classes" @click.stop="changeShow">
			<text class="tree-icon tree-ocl"></text>
			<uni-icons v-if="item[defaultProps.children] && item[defaultProps.children].length > 0" 
			 custom-prefix="zyf" type="icon-folderPlus" size="18" color="#007bfd"></uni-icons>
			<uni-icons v-else custom-prefix="zyf" type="icon-wenjian" size="18" color="#007bfd"></uni-icons>
			<view style="display: flex; justify-content: space-between;width: 100%;">
				<text class="txt">{{item[defaultProps.label]}}</text>
				<view class="zyf-tree-check" @click.stop="_treeItemSelect(item, row_index)">
					<view class="zyf-tree-check-yes radio" v-if="item.checked">
						<view class="zyf-tree-check-yes-b" style="background: #007AFF;"></view>
					</view>
					<view  v-else class="zyf-tree-check-no radio"></view>
				</view>
			</view>
		</view>
		<view class="tree-node content" :class="classes"
			v-if="item[defaultProps.children] && item[defaultProps.children].length > 0"
			v-show="item.opened">
			<tree-node v-for="(sitem, index) in item[defaultProps.children]" 
				:item="sitem" 
				:key="sitem[defaultProps.id]"
				:row_index="index"
				:klass="index === item[defaultProps.children].length-1?'tree-last':''"
				:defaultProps="defaultProps"></tree-node>
		</view>
	</view>
</template>

<script>
	import TreeNode from './tree-node.vue'
	export default {
		name: 'TreeNode',
		components: {TreeNode},
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
			row_index:Number,
			klass: String
		},
		inject: ['defaultProps', 'onClickItem', 'onSelectItem'],
		computed:{
				isFolder () {
						return this.item[this.defaultProps.children] && this.item[this.defaultProps.children].length
				},
				treeList(){},
			 classes () {
				 return [
					 {'tree-open': this.item.opened},
					 {'tree-closed': !this.item.opened},
					 {'tree-leaf': !this.isFolder},
					 {[this.klass]: !!this.klass}
				 ]
			 }
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			_treeItemSelect(item, index) {
				this.onSelectItem(item)
				this.onClickItem(this.item);
				this.item.checked = !this.item.checked
			},
			changeShow() {
				if (this.item[this.defaultProps.children] && this.item[this.defaultProps.children].length > 0) {
					this.item.opened = !this.item.opened;
				}
			}
		}
	}
</script>
<style>
	@import "../../../static/iconfont.css";
</style>
<style scoped lang="scss">
	@mixin animate2 {
	    -moz-transition: all .2s linear;
	    -webkit-transition: all .2s linear;
	    -o-transition: all .2s linear;
	    -ms-transition: all .2s linear;
	    transition: all .2s linear;
	}
	.tree-item{
		.tree-node,.tree-icon{
			background-image: url("data:image/png;base64,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");
		}
		.tree-node {
			background-position: -295px -1px;
			background-repeat: repeat-y;
			&.tree-last{
				background: transparent;
			}
			&.tree-leaf{
				.tree-ocl{
					background-position: -68px -4px;
				}
			}
		}
		.tree-icon{
			width: 24px;
			height: 24px;
			line-height: 24px;
		}
		.tree-closed > .tree-ocl{
			background-position: -103px -1px;
		}
		
		.tree-open > .tree-ocl{
			background-position: -135px -1px;
		}
		.head{
			display: flex;
			// align-items: center;
			line-height: 60rpx;
			&.tree-last{
				background: transparent;
			}
			.txt{
				font-size: 30rpx;
				color: #222;
				padding-left: 10rpx;
			}
		}
		.left-icon{
			width: 40rpx;
			height: 40rpx;
			@include animate2;
			transform: rotate(-90deg);
			-ms-transform:rotate(-90deg);
			-moz-transform:rotate(-90deg);
			-webkit-transform: rotate(-90deg);
			-o-transform:rotate(-90deg);
			&.rt45{
				transform: rotate(0deg);
				-ms-transform:rotate(0deg);
				-moz-transform:rotate(0deg);
				-webkit-transform: rotate(0deg);
				-o-transform:rotate(0deg);
			}
		}
		.content{
			padding-left: 65rpx;
		}
	}
	.tki-tree-check {
	  width: 80rpx;
	  // height: 40px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.zyf-tree-check-yes,
	.zyf-tree-check-no {
	  width: 40rpx;
	  height: 40rpx;
	  border-top-left-radius: 20%;
	  border-top-right-radius: 20%;
	  border-bottom-right-radius: 20%;
	  border-bottom-left-radius: 20%;
	  border-top-width: 1rpx;
	  border-left-width: 1rpx;
	  border-bottom-width: 1rpx;
	  border-right-width: 1rpx;
	  border-style: solid;
	  border-color: #007bfd;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  box-sizing: border-box;
	}
	.zyf-tree-check-yes-b {
	  width: 12px;
	  height: 12px;
	  border-top-left-radius: 20%;
	  border-top-right-radius: 20%;
	  border-bottom-right-radius: 20%;
	  border-bottom-left-radius: 20%;
	  background-color: #007bfd;
	}
	.zyf-tree-check .radio {
	  border-top-left-radius: 50%;
	  border-top-right-radius: 50%;
	  border-bottom-right-radius: 50%;
	  border-bottom-left-radius: 50%;
	}
	.zyf-tree-check .radio .zyf-tree-check-yes-b {
	  border-top-left-radius: 50%;
	  border-top-right-radius: 50%;
	  border-bottom-right-radius: 50%;
	  border-bottom-left-radius: 50%;
	}
</style>
