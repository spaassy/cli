### spaassy-cli

默认用户已安装node，并且版本>8.6

首先全局安装spaassy脚手架spaassy-cli

运行node命令：

```node
npm i spaassy-cli -g
```

初始化spaassy项目：

```node
spaassy init -p newProject
```

init是初始化spaassy项目的命令，-p是项目名称的设置，newProject就是你项目的名称，你也可以直接执行：

```node
spaassy init
```

没有项目名称，脚手架会默认设置新项目的名称为spaassy。

spaassy框架内置了react+react-router+axios+spaassy-redux，spaassy-redux基于react-redux库并改写了内部的一些函数，在使用spaassy之前你需要参考一下spaassy相关文档。并且spaassy-redux是spaassy实现微前端的核心库。

spaassy使用文档：[查看](https://spaassy.github.io/)