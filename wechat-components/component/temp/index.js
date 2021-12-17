Component({

// 组件的属性列表
// 组件的使用 <Select class="section-select" select-array='{{selectArray}}'  current-text="{{current_text}}" bind:getNowData='getCurrentTextAction'></Select>
//select-array 对应properties中selectArray的值
// bind:getNowData 绑定事件 需要在methods 执行并传参 // this.triggerEvent('getNowData', nowDate);

  properties: {
    selectArray: {
      type: Array,
    },
     // 初始时要展示的内容
    currentText:{
      type:String,
    }
  },

//  组件的初始数据
  data: {
    title:"组件"
  },

//  组件的方法列表
  methods: {
    action1: function () {

            // // 内容更新后，需要把更新的数据传输出去
            // var nowDate = {
            //   id: index,
            //   name: current_text,
            //   type: current_type
            // }
            // // 这里的 getNowData 要和外部的 bind:getNowData ，名称一定要对应
            // this.triggerEvent('getNowData', nowDate);
    },
    action2: function () {

    },
  }
})