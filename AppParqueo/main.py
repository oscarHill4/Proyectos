import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QMessageBox, QTableWidgetItem
from PyQt5.uic import loadUi
import sqlite3
import datetime

class Parqueo(QMainWindow):
    def __init__(self):
        self.conexion = sqlite3.connect("parqueo.db")
        super(Parqueo, self).__init__()
        loadUi("AppParqueo.ui", self)
        self.vehiculos = {}
       

        self.pushButton.clicked.connect(lambda: self.stackedWidget.setCurrentWidget(self.ingreso))
        self.pushButton_2.clicked.connect(lambda: self.stackedWidget.setCurrentWidget(self.tarifas))
        self.pushButton_3.clicked.connect(lambda: self.stackedWidget.setCurrentWidget(self.salida))

        self.bt_ingresar.clicked.connect(self.ingresar)
        self.buscar.clicked.connect(self.load_data)
        self.bt_agregar_tarifa.clicked.connect(self.agregar_tarifa)
        self.bt_eliminar_tarifa.clicked.connect(self.eliminar_tarifa)
        self.buscar_2.clicked.connect(self.eliminarVehiculo)

        self.actualizar_tabla_tarifas()

    def ingresar(self):
        cursor = self.conexion.cursor()

        placa = self.textEdit.toPlainText()
        hora = datetime.datetime.now()
        parqueo=self.comboBox.currentText()
        Tvehiculo=self.comboBox_2.currentText()

        self.vehiculos[placa] = hora
        print(self.vehiculos)

        with open (r"C:\Users\Oscar Daniel Gil\Desktop\AppParqueo\archivoVehiculos.txt", "a") as archivo:

            archivo.write(f"Tipo de Vehiculo: {Tvehiculo}\nPlaca: {placa}\nFecha y Hora: {hora}\n\n")

        sql= '''INSERT INTO vehiculo (placa,parqueo,Tvehiculo) VALUES ('{}','{}','{}')'''.format(placa,parqueo,Tvehiculo)

        mensaje1 = f"Placa: {placa} esta vacida"
        mensaje = f"se registro"

        if placa != "":
            QMessageBox.information(self, 'Mensaje de ingreso',mensaje)
            cursor.execute(sql)
            self.conexion.commit()
            cursor.close()

        else:
            QMessageBox.information(self, 'Mensaje de ingreso',mensaje1)
        
        self.textEdit.clear()

    def eliminarVehiculo(self):
            placa = self.textEdit_2.toPlainText()
            cursor = self.conexion.cursor()
            cursor.execute("DELETE FROM vehiculo WHERE placa = ?", (placa,))
            self.conexion.commit()
            cursor.close()
            self.label_placa.clear()
            self.cobro.clear()
            self.cobro_2.clear()
            self.vehiculo.clear()
            self.textEdit_2.clear()
            QMessageBox.information(self, 'Mensaje de ingreso', 'se imprimio su recibo')


    def load_data(self):
        cursor = self.conexion.cursor()

        placa = self.textEdit_2.toPlainText()

        sql_vehiculo = '''SELECT placa, parqueo, Tvehiculo FROM vehiculo WHERE placa = ?'''
        cursor.execute(sql_vehiculo, (placa,))
        datos_vehiculo = cursor.fetchone()

        if datos_vehiculo:
            Tvehiculo = datos_vehiculo[2]
            sql_tarifa = '''SELECT precio_hora, precio_dia, precio_mes FROM tarifa WHERE tipo_vehiculo = ?'''
            cursor.execute(sql_tarifa, (Tvehiculo,))
            datos_tarifa = cursor.fetchone()

            if datos_tarifa:
                self.label_placa.setText(f'{datos_vehiculo[0]}')
                self.cobro_2.setText(f'{datos_vehiculo[1]}')
                self.vehiculo.setText(f'{datos_vehiculo[2]}')

                if self.vehiculo.text() == "motocicleta":
                    if self.cobro_2.text() == "Hora":
                        diferencia = datetime.datetime.now()-self.vehiculos[placa]
                        total_segundos = diferencia.total_seconds()
                        tiempo = total_segundos // 3600

                        if tiempo == 0:
                            self.cobro.setText(f"${700}")
                        elif total_segundos % 3600 == 0:
                            self.cobro.setText(f"${tiempo*700}")
                        elif total_segundos % 3600 != 0:
                            self.cobro.setText(f"${700+(tiempo*700)}")

                    elif self.cobro_2.text() == "Dia":
                        diferencia = datetime.datetime.now()-self.vehiculos[placa]
                        total_segundos = diferencia.total_seconds()
                        tiempo = total_segundos // 86400

                        if tiempo == 0:
                            self.cobro.setText(f"${3000}")
                        elif total_segundos % 3600 == 0:
                            self.cobro.setText(f"${tiempo*3000}")
                        elif total_segundos % 3600 != 0:
                            self.cobro.setText(f"${3000+(tiempo*3000)}")

                    elif self.cobro_2.text() == "Mes":
                        tiempo = datetime.datetime.now()-self.vehiculos[placa]
                        self.cobro.setText(f"Mensualidad")

                elif self.vehiculo.text() == "automovil":
                    if self.cobro_2.text() == "Hora":
                        diferencia = datetime.datetime.now()-self.vehiculos[placa]
                        total_segundos = diferencia.total_seconds()
                        tiempo = total_segundos // 3600

                        if tiempo == 0:
                            self.cobro.setText(f"${1400}")
                        elif total_segundos % 3600 == 0:
                            self.cobro.setText(f"${tiempo*1400}")
                        elif total_segundos % 3600 != 0:
                            self.cobro.setText(f"${1400+(tiempo*1400)}")

                    elif self.cobro_2.text() == "Dia":
                        diferencia = datetime.datetime.now()-self.vehiculos[placa]
                        total_segundos = diferencia.total_seconds()
                        tiempo = total_segundos // 86400

                        if tiempo == 0:
                            self.cobro.setText(f"${22000}")
                        elif total_segundos % 3600 == 0:
                            self.cobro.setText(f"${tiempo*22000}")
                        elif total_segundos % 3600 != 0:
                            self.cobro.setText(f"${20000+(tiempo*22000)}")

                    elif self.cobro_2.text() == "Mes":
                        tiempo = datetime.datetime.now()-self.vehiculos[placa]
                        self.cobro.setText(f"Mensualidad")

                elif self.vehiculo.text() == "camion":
                    if self.cobro_2.text() == "Hora":
                        diferencia = datetime.datetime.now()-self.vehiculos[placa]
                        total_segundos = diferencia.total_seconds()
                        tiempo = total_segundos // 3600

                        if tiempo == 0:
                            self.cobro.setText(f"${10000}")
                        elif total_segundos % 3600 == 0:
                            self.cobro.setText(f"${tiempo*10000}")
                        elif total_segundos % 3600 != 0:
                            self.cobro.setText(f"${10000+(tiempo*10000)}")

                    elif self.cobro_2.text() == "Dia":
                        diferencia = datetime.datetime.now()-self.vehiculos[placa]
                        total_segundos = diferencia.total_seconds()
                        tiempo = total_segundos // 86400

                        if tiempo == 0:
                            self.cobro.setText(f"${40000}")
                        elif total_segundos % 3600 == 0:
                            self.cobro.setText(f"${tiempo*40000}")
                        elif total_segundos % 3600 != 0:
                            self.cobro.setText(f"${40000+(tiempo*40000)}")

                    elif self.cobro_2.text() == "Mes":
                        tiempo = datetime.datetime.now()-self.vehiculos[placa]
                        self.cobro.setText(f"Mensualidad")

            else:
                QMessageBox.information(self, 'Mensaje de ingreso', 'No se encontraron tarifas para el tipo de vehículo especificado')
        else:
            QMessageBox.information(self, 'Mensaje de ingreso', 'No se encontraron datos para la placa especificada')
            self.textEdit_2.clear()


        cursor.close()

    def agregar_tarifa(self):
        tipo_vehiculo = self.tipo_vehiculo.text()
        precio_hora = self.precio_hora.text()
        precio_dia = self.precio_dia.text()
        precio_mes = self.precio_mes.text()
        

        if(tipo_vehiculo != "" and precio_hora != "" and precio_dia != "" and precio_mes != ""):
            cursor = self.conexion.cursor()

            cursor.execute("INSERT INTO tarifa (tipo_vehiculo, precio_hora, precio_dia, precio_mes) VALUES (?, ?, ?, ?)", (tipo_vehiculo, precio_hora, precio_dia, precio_mes))
            self.conexion.commit()

            self.actualizar_tabla_tarifas()

            self.tipo_vehiculo.clear()
            self.precio_hora.clear()
            self.precio_dia.clear()
            self.precio_mes.clear()

            QMessageBox.information(self, "Mensaje", "¡Tarifa agregada correctamente!")
        else:
            self.tipo_vehiculo.clear()
            self.precio_hora.clear()
            self.precio_dia.clear()
            self.precio_mes.clear()
            QMessageBox.information(self, "Mensaje", "¡No hay datos!")

    def eliminar_tarifa(self):
        fila_seleccionada = self.tabla_tarifas.currentRow()

        if fila_seleccionada != -1:
            tipo_vehiculo = self.tabla_tarifas.item(fila_seleccionada, 0).text()
            cursor = self.conexion.cursor()
            cursor.execute("DELETE FROM tarifa WHERE tipo_vehiculo = ?", (tipo_vehiculo,))
            self.conexion.commit()
            
            self.actualizar_tabla_tarifas()
            self.tabla_tarifas.clearSelection()
            QMessageBox.information(self, "Mensaje", "Tarifa eliminada correctamente")
        else:
            QMessageBox.information(self, "Mensaje", "No se ha seleccionado ninguna fila")

    def actualizar_tabla_tarifas(self):
        cursor = self.conexion.cursor()

        cursor.execute("SELECT * FROM tarifa")
        tarifas = cursor.fetchall()

        self.tabla_tarifas.setRowCount(0)
        for fila, tarifa in enumerate(tarifas):
            self.tabla_tarifas.insertRow(fila)
            for columna, valor in enumerate(tarifa):
                self.tabla_tarifas.setItem(fila, columna, QTableWidgetItem(str(valor)))

    def closeEvent(self, event):
        self.conexion.close()
        

if __name__ == "__main__":
    app = QApplication(sys.argv)
    my_app = Parqueo()
    my_app.show() 
    sys.exit(app.exec_())