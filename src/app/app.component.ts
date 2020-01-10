import { Component } from '@angular/core';

interface DataModel {
  iid:number;
  bill_date:string;
  one_way:number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'showEnumOpts';

  opts:{
    'tableStyle':any[],
    'tableData':DataModel[]
  } = {
    'tableStyle' :
    [
      {
        "iid": 1,
        "table_name": "road_trip",
        "field_name": "iid",
        "text": "自增主键",
        "seq": 0,
        "visible": 1,
        "immutable": 1,
        "bool_column": 1,
        "opts": "",
        "width_primeng_str": "100px",
        "align_header": "center",
        "align_cell": "center",
        "tick_pipe": 0,
        "cn_pipe": false,
        "access_pipe": false,
        "create_time": "2020-01-07 15:46:22",
        "width_zorro": 100.00,
        "width_primeng": 100.00,
        "get_url": "",
        "width_percent": 10.0,
        "date_pipe": false,
        "date_formatter": "yyyy-MM-dd",
        "ctl_type": "input"
      },
      {
        "iid": 2,
        "table_name": "road_trip",
        "field_name": "bill_date",
        "text": "发生日期",
        "seq": 0,
        "visible": 1,
        "immutable": 0,
        "bool_column": 1,
        "opts": "",
        "width_primeng_str": "100px",
        "align_header": "center",
        "align_cell": "center",
        "tick_pipe": 0,
        "cn_pipe": false,
        "access_pipe": false,
        "create_time": "2020-01-07 15:46:22",
        "width_zorro": 100.00,
        "width_primeng": 100.00,
        "get_url": "",
        "width_percent": 13.0,
        "date_pipe": true,
        "date_formatter": "yyyy-MM-dd",
        "ctl_type": "date"
      },
      {
        "iid": 4,
        "table_name": "road_trip",
        "field_name": "one_way",
        "text": "单程",
        "seq": 0,
        "visible": 1,
        "immutable": 0,
        "bool_column": 1,
        "opts": "1=单程,2=往返",
        "width_primeng_str": "100px",
        "align_header": "center",
        "align_cell": "center",
        "tick_pipe": 0,
        "cn_pipe": false,
        "access_pipe": false,
        "create_time": "2020-01-07 15:46:22",
        "width_zorro": 100.00,
        "width_primeng": 100.00,
        "get_url": "",
        "width_percent": 10.0,
        "date_pipe": false,
        "date_formatter": "yyyy-MM-dd",
        "ctl_type": "optsEnum"
      }
    ],
    'tableData':
    [
      {
        "iid": 30,
        "bill_date": "2020-01-30 07:58:23",
        "one_way": 1,
      },
      {
        "iid": 33,
        "bill_date": "2020-01-28 08:00:54",
        "one_way": 2,
      },
      {
        "iid": 34,
        "bill_date": "2020-01-22 14:59:17",
        "one_way": 2,
      },
      {
        "iid": 35,
        "bill_date": "2020-01-07 15:09:52",
        "one_way": 1,
      }
    ]
  }

  // 为表格列（对象属性）做解释
  // 比如 field_name 表示字段名称
  // text 表示该字段对应的中文名称，会被设置显示到列头上
  // 其他属性本例中未使用到，需要解释的是 opts
  // 表示该字段上需要通过程序做翻译逻辑，就如 "1=单程,2=往返"
  // 当表格中某行在该字段（one_way）中储存的值是1，那么要显示出来的应该是：单程
  // 如果是2，则应该显示为：往返
  // 本代码中的方法 showEnumOptsLabel 就是为实现该逻辑制作的，但是并没有显示到视图中
  // 查看控制台打印的信息可以看到执行的逻辑是正确的，那么我要如何能达到上面说的效果呢？
  tableStyle:any[] = [];

  // 填充到表格数据（对象数组）
  tableData:DataModel[] = [];

  constructor(){
    this.init();
  }

  init(){
    setTimeout(() => {// 模拟请求远程获取表格样式数据
      this.tableStyle = this.opts.tableStyle;
    }, 300);

    setTimeout(() => {// 模拟请求远程获取表格数据
      this.tableData = this.tableData.concat(this.opts.tableData);
    }, 200);
  }


  showEnumOptsLabel(record,tsRow):any{
    let opts:string = tsRow.opts;
    if( opts.length<=0 ) return record[tsRow.field_name];
    
    let arr1 = opts.split(',');
    let ret = null;
    // console.log('选项字符串是：' + opts);
    arr1.forEach(ele1 => {
      let arr2 = ele1.split('=');
      let val1 = arr2[0] + '';
      let val2 = record[tsRow.field_name] + '';
      if( val1 == val2 ) {
        console.log('主键'+record.iid+'为字段' +tsRow.field_name+'返回：' + arr2[1]);
        ret = arr2[1];
        return arr2[1];
      }
    });

    return ret === null?record[tsRow.field_name]:ret;

    // 下面一行代码可以代替上面从158开始到本行的所有代码
    // return arr1.map(v => v.split('=')).filter(v => v[0] == record[tsRow.field_name]).map(v => v[1]);
    /// 请注意返回类型，map()方法将返回一个数组。
  }

  
}
