<template>
	 <mu-flat-button :label="menuData.label" :icon="icon" labelClass="menuFont" ref="btn" @click="toggle">
	 	<mu-popover :trigger="menu" :open="open" @close="close">
	        <mu-menu>
	        	<template v-for="item in menuData.items">
	          		<mu-menu-item :title="item.title" @click="click(item.url)"/>
	          	</template>
	        </mu-menu>
      	</mu-popover>
	 </mu-flat-button>
</template>

<script>
export default {
	name: "MenuButton",
	props: ['menuData', 'icon'],
	data() {
      return {
        open: false,
        menu: null
      }
    },
    mounted() {
      this.menu = this.$refs.btn.$el;

    },
    methods: {
      close() {
        this.open = false;
      },
      toggle() {
        this.open = !this.open;
      },
      click(url) {
        this.open = false;
        this.$router.push(url);
      },
    }
}
</script>

<style>
.menuFont {
  font-size: 18px;
}
</style>