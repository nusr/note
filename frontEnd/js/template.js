
// 字符串
Vue.component('my-checkbox', { template: '<div class="checkbox-wrapper" @click="check"><div :class="{ checkbox: true, checked: checked }"></div><div class="title"></div></div>', data() { return { checked: false, title: 'Check me' } }, methods: { check() { this.checked = !this.checked; } } })

//x-template
Vue.component('my-checkbox', { template: '#checkbox-template', data() { return { checked: false, title: 'Check me' } }, methods: { check() { this.checked = !this.checked; } } }); <script type="text/x-template" id="checkbox-template"> <div class="checkbox-wrapper" @click="check"> <div :class="{ checkbox: true, checked: checked }"></div> <div class="title"></div> </div> </script>

// 内联模板

Vue.component('my-checkbox', { data() { return { checked: false, title: 'Check me' } }, methods: { check() { this.checked = !this.checked; } } }); <my-checkbox inline-template> <div class="checkbox-wrapper" @click="check"> <div :class="{ checkbox: true, checked: checked }"></div> <div class="title"></div> </div> </my-checkbox>

// render 
Vue.component('my-checkbox', { data() { return { checked: false, title: 'Check me' } }, methods: { check() { this.checked = !this.checked; } }, render(createElement) { return createElement( 'div', { attrs: { 'class': 'checkbox-wrapper' }, on: { click: this.check } }, [ createElement( 'div', { 'class': { checkbox: true, checked: this.checked } } ), createElement( 'div', { attrs: { 'class': 'title' } }, [ this.title ] ) ] ); } });

//JSX

Vue.component('my-checkbox', { data() { return { checked: false, title: 'Check me' } }, methods: { check() { this.checked = !this.checked; } }, render() { return <div class="checkbox-wrapper" onClick={ this.check }> <div class={{ checkbox: true, checked: this.checked }}></div> <div class="title">{ this.title }</div> </div> } });

// 单文件组件

<template>
    <div class="checkbox-wrapper" @click="check">
        <div :class="{ checkbox: true, checked: checked }"></div>
        <div class="title"></div>
    </div>
</template> <script> export default { data() { return { checked: false, title: 'Check me' } }, methods: { check() { this.checked = !this.checked; } } } </script>

// compile


export default{
	render(){
            return Vue.compile(`
                <div class="AnalyzeTab">
                        <div class="AnalyzeTab__main-form" v-show="showHead">
                            ${this.slotHead}
                        </div>
                </div>

            `).render.call(this)
        },

        data(){
            return {
                slotHead: `
                    <Form ref="searchForm" :model="formModel" :config="formConfig" :label-width="0">
                        <div v-if="Object.keys(formConfig).length <= 1" class="flex-between flex-top">
                            <h1 class="AnalyzeTab__main-content-title" v-text="title"></h1>
                            <SmartFormItem v-for="config in formConfig" :config="config" :form-model="formModel" :key="config.prop" @on-change="search('button')"></SmartFormItem>
                        </div>
                        <template v-else>
                            <h1 class="AnalyzeTab__main-content-title" v-text="title"></h1>
                            <div class="flex-between flex-wrap">
                                <SmartFormItem v-for="config in formConfig" :config="config" :form-model="formModel" :key="config.prop" @on-change="search('button')"></SmartFormItem>
                            </div>
                        </template>
                    </Form>
                `
            }
        }
}
