```
事前準備
npm install -g typescript

ts → js && js 実行
rm -rf  output  && tsc execute.ts --outDir js && node ./js/execute.js
```

```
記述方法
config.txt

# コメントはTs生成から無視されます
AaaSetting.graph_setting_id=undefined
AaaSetting.graph_setting_name='デフォルト'
AaaSetting.graph_setting_key='default'
AaaSetting.graph_unit='回'

↑改行もTs生成から無視されます。
AaaSetting.graph_coef=1
AaaSetting.graph_setting_fraction_digits=1
AaaSetting.graph_y_axis_max=10
AaaSetting.graph_y_axis_min=1
AaaSetting.is_enabled_graph_setting=true
AaaSetting.is_edit=false
AaaSetting.is_realtime=false
```