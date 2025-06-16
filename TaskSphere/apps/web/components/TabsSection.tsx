import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarDays,
  CheckCircle,
  Users,
  FileText,
  BriefcaseBusiness,
  Code,
  Palette,
  Globe,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react"

export default function TabsSection() {
  return (
    <section className="w-full flex justify-center">
      <div className="container px-4 md:px-6">
        <Tabs defaultValue="categorias" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categorias">Categorias de Projetos</TabsTrigger>
            <TabsTrigger value="atividades">Atividades Recentes</TabsTrigger>
            <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
          </TabsList>

          {/* Categorias de Projetos */}
          <TabsContent value="categorias" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <CardTitle className="text-primary">Desenvolvimento</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Projetos de desenvolvimento de software e aplicações.</p>
                    <ul className="text-sm space-y-1">
                      <li>• Aplicações Web e Mobile</li>
                      <li>• APIs e Microserviços</li>
                      <li>• Sistemas Corporativos</li>
                    </ul>
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Criar Projeto</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    <CardTitle className="text-primary">Design</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Projetos de design gráfico, UI/UX e identidade visual.</p>
                    <ul className="text-sm space-y-1">
                      <li>• Interface de Usuário</li>
                      <li>• Identidade Visual</li>
                      <li>• Material Gráfico</li>
                    </ul>
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Criar Projeto</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <CardTitle className="text-primary">Marketing Digital</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Campanhas de marketing digital e estratégias online.</p>
                    <ul className="text-sm space-y-1">
                      <li>• Campanhas Publicitárias</li>
                      <li>• Gestão de Redes Sociais</li>
                      <li>• SEO e Conteúdo</li>
                    </ul>
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Criar Projeto</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Atividades Recentes */}
          <TabsContent value="atividades" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription>Últimas ações realizadas no sistema de tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Task concluída</p>
                      <p className="text-sm text-gray-500">"Implementar sistema de login" - Projeto TaskSphere</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarDays className="mr-1 h-3 w-3" />
                        <span>Hoje, 14:30</span>
                      </div>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Novo projeto criado</p>
                      <p className="text-sm text-gray-500">"E-commerce Mobile App" - Categoria: Desenvolvimento</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarDays className="mr-1 h-3 w-3" />
                        <span>Hoje, 11:15</span>
                      </div>
                    </div>
                  </div>
                  {/* Item 3 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Membro adicionado</p>
                      <p className="text-sm text-gray-500">Maria Silva foi adicionada ao projeto "Website Redesign"</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarDays className="mr-1 h-3 w-3" />
                        <span>Ontem, 16:45</span>
                      </div>
                    </div>
                  </div>
                  {/* Item 4 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Prazo próximo do vencimento</p>
                      <p className="text-sm text-gray-500">"Criar protótipo de alta fidelidade" - Vence em 2 dias</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarDays className="mr-1 h-3 w-3" />
                        <span>Ontem, 10:20</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Desempenho */}
          <TabsContent value="desempenho" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Desempenho do Sistema</CardTitle>
                <CardDescription>Estatísticas de projetos e produtividade da equipe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <BriefcaseBusiness className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Projetos Ativos</p>
                      <p className="text-3xl font-bold">24</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Tasks Concluídas</p>
                      <p className="text-3xl font-bold">1,248</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Taxa de Conclusão</p>
                      <p className="text-3xl font-bold">87%</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Tempo Médio</p>
                      <p className="text-3xl font-bold">3.2d</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
