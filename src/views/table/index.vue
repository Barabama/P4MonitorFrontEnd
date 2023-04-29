<template>
  <div class="app-container">
    <el-select v-model="value" placeholder="请选择设备" class="selector" @change="show">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-table :data="showTable" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="table">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.table" />
          </template>
          <span v-else>
            {{ row.table }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="action_name">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.action_name" />
          </template>
          <span v-else>
            {{ row.action_name }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="action_params">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.action_params.swid" />
          </template>
          <span v-else>
            {{ row.action_params }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="{ row }">
          <el-button v-if="row.edit" type="success" size="small" icon="el-icon-circle-check-outline"
            @click="saveInfo(row)">
            Ok
          </el-button>
          <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="editInfo(row)">
            Update
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; align-items: center;margin-top: 32px; gap: 32px;">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="probe" />
        <el-checkbox label="ipv4" />
        <el-checkbox label="ecmp" />
      </el-checkbox-group>
      <el-button type="primary" @click="writeTable">下发流表</el-button>
    </div>
  </div>
</template>

<script>
import { api } from '@/config'
export default {
  data() {
    return {
      showTable: [],
      flowTable: {},
      options: [{
        label: '请选择',
        value: ''
      }],
      value: '',
      checkList: []
    }
  },
  beforeCreate() {
    fetch(api + '/read_table').then(r => r.json()).then(data => {
      for (const key of Object.keys(data)) {
        for (const it of data[key]) {
          it.edit = false
        }
        this.options.push({
          value: key,
          label: key
        })
      }
      this.flowTable = data
      console.log(this.flowTable)
      this.show()
    })
  },
  methods: {
    // fetchData() {
    //   this.listLoading = true
    //   getList().then((response) => {
    //     this.list = response.data.items
    //     this.listLoading = false
    //   })
    // },
    show() {
      this.showTable = this.flowTable[this.value]
    },
    saveInfo(row) {
      row.edit = false
      // setTimeout(() => {
      //   this.$message({
      //     message: '流表已被更新',
      //     type: 'success'
      //   })
      // }, 700)
      // fetch(api + '/write_table', { method: 'POST', body: JSON.stringify(this.flowTable), headers: { 'Content-type': 'application/json' } }).then(r => r.text()).then(t => {
      //   this.$message({
      //     message: t,
      //     type: 'success'
      //   })
      // })
    },
    editInfo(row) {
      row.edit = true
    },
    writeTable() {
      console.log(this.checkList)
      fetch(api + '/write_table', { method: 'POST', body: JSON.stringify(this.checkList), headers: { 'Content-type': 'application/json' }}).then(r => r.text()).then(t => {
        this.$message({
          message: t,
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
.selector {
  margin-bottom: 10px;
}

/* .app-container >>> .el-input__inner {
  border: 0;
} */
</style>
